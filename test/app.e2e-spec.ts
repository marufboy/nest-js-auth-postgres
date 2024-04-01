import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { PrismaService } from '../src/prisma/prisma.service'
import * as pactum from 'pactum'
import { AuthDto } from '../src/auth/dto'
import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto'
import { EditUserDto } from '../src/user/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    )
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'pengenganteng@gmail.com',
      password: 'pengenganteng',
    }

    describe('Signup', () => {
      it('should throw exception if form empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe('Signin', () => {
      it('should throw exception if form empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it('should throw credentials incorrect', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
            password: '123',
          })
          .expectBody({
            error: 'Forbidden',
            message: 'Credentials Incorrect',
            statusCode: 403,
          })
          .expectStatus(403)
      })

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
      })
    })

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'pengen',
          lastName: 'ganteng',
        }

        return pactum
          .spec()
          .patch('/users')
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
      })
    })
  })

  describe('Bookmarks', () => {
    describe('Get empty bookmark', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBody([])
      })
    })

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: "First bookmark",
        description: "ustadz adi hidayat youtube series",
        link: "https://www.youtube.com/watch?v=vrdYQYo-dhM"
      }
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id')
      })
    })

    describe('Get bookmark', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(1)
      })
    })

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}')
      })
    })

    describe('Edit bookmark', () => {
      it('should edit bookmark by id', () => {
        const dto: EditBookmarkDto = {
          title: "Update title",
        }

        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
      })
    })

    describe('Delete bookmark', () => {
      it('should delete bookmark by id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{userAt}')
          .expectStatus(204)
      })

      it('should get empty bookmark', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(0)
      })
    })
  })
})
