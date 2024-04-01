import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { BookmarkService } from './bookmark.service'
import { GetUser } from '../auth/decorator'
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse, ApiOkResponse, ApiTags,
} from '@nestjs/swagger'
import { BookmarkEntity } from './entity/bookmark.entity'

@UseGuards(JwtGuard)
@ApiTags("Bookmarks")
@ApiBearerAuth()
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description:
      'Create bookmark object as response',
    type: BookmarkEntity,
  })
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    )
  }

  @Patch(':id')
  @ApiOkResponse({
    description:
      'update successfull bookmark object as response',
    type: BookmarkEntity,
  })
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    )
  }

  @Get()
  @ApiOkResponse({
    description:
      'Get bookmarks object as response',
    type: BookmarkEntity,
    isArray: true,
  })
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    )
  }

  @Get(':id')
  @ApiOkResponse({
    description:
      'Get bookmark object as response',
    type: BookmarkEntity,
  })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    )
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOkResponse({
    description:
      'delete bookmark by id',
  })
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    )
  }
}
