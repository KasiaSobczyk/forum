import { PageEvent } from "@angular/material";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { UserService } from "src/app/start/user.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  loader = false;
  loggedUser = false;
  currentPage = 1;
  postAmount = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  memberId: string;
  private postsSub: Subscription;
  private userStatus: Subscription;

  constructor(public postsService: PostsService, private userService: UserService) { }

  ngOnInit() {
    this.loader = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.memberId = this.userService.getMemberId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.loader = false;
        this.postAmount = postData.postCount;
        this.posts = postData.posts;
      });
    this.loggedUser = this.userService.getAuth();
    this.userStatus = this.userService.getStatus().subscribe(isLogin => {
      // console.log("Login " + isLogin);
      this.loggedUser = isLogin;
      this.memberId = this.userService.getMemberId();
      // console.log("Id " +this.memberId);
    });
  }

  onDelete(postId: string) {
    this.loader = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.loader = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userStatus.unsubscribe();
  }

  onChangePage(pageData: PageEvent) {
    this.loader = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
