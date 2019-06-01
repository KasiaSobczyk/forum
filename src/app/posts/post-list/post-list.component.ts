import { PageEvent } from "@angular/material";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { UserService } from "src/app/start/user.service";
import { post } from "selenium-webdriver/http";

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
  comments = false;
  showForm = false;
  private postsSub: Subscription;
  private userStatus: Subscription;
  username: string;
  likeNumber: number;

  constructor(public postsService: PostsService, private userService: UserService) { }

  ngOnInit() {
    this.loader = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.memberId = this.userService.getMemberId();
    this.username = this.userService.getUserName();
    // console.log("name " + this.username);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.loader = false;
        this.postAmount = postData.postCount;
        this.posts = postData.posts;
        // console.log(this.posts[0].likes);
        this.likeNumber = this.posts[0].likes;
      });  
    this.loggedUser = this.userService.getAuth();
    this.userStatus = this.userService.getStatus().subscribe(isLogin => {
      this.loggedUser = isLogin;
      this.memberId = this.userService.getMemberId();
      this.username = this.userService.getUserName();
      // console.log("name1 " + this.posts.likes);
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

  showComment() {
    this.comments = !this.comments;
  }

  addComment() {
    this.showForm = !this.showForm;
  }

  likePost(postId: string) {
    // let like: number;
    this.postsService.getPost(postId).subscribe(() => {
      this.postsService.likePost(postId, this.likeNumber).subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }, () => {
        this.loader = false;
      });
    });
  }

  dislikePost(postId: string) {
    this.postsService.getPost(postId).subscribe(() => {
      this.postsService.dislikePost(postId, this.likeNumber).subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }, () => {
        this.loader = false;
      });
    });
  }
}
