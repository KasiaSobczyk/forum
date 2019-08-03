import { PageEvent } from "@angular/material";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { UserService } from "src/app/start/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: (Post & { showComments?: boolean })[] = [];
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
  // likeNumber: number = 0;
  form: FormGroup;
  showComments = [];
  addNewComment = [];
  
  constructor(public postsService: PostsService, private userService: UserService) { }

  ngOnInit() {
    this.loader = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.memberId = this.userService.getMemberId();
    this.username = this.userService.getUserName();
    this.form = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required]
      }) });
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.loader = false;
        this.postAmount = postData.postCount;
        this.posts = postData.posts;
        // this.likeNumber = this.posts[0].likes;
      });  
    this.loggedUser = this.userService.getAuth();
    this.userStatus = this.userService.getStatus().subscribe(isLogin => {
      this.loggedUser = isLogin;
      this.memberId = this.userService.getMemberId();
      this.username = this.userService.getUserName();
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

  switchShowComments(index: number) {
    this.posts[index].showComments = !this.posts[index].showComments;
  }

  // showComment(id) {
  //   if(this.showComments.includes(id)) {
  //     this.showComments.splice(this.showComments.indexOf(id), 1) ;
  //   } else {
  //     this.showComments.push(id);
  //   }
  // }

  addComment(id) {
    if(this.addNewComment.includes(id)) {
      this.addNewComment.splice(this.addNewComment.indexOf(id), 1) ;
    } else {
      this.addNewComment.push(id);
    }
  }
 
  onComment(postId: string, i: number) {
    if (this.form.invalid) {
      return;
    }
    this.loader = true;
    // console.log("id  ",postId)
    this.postsService.addComment(postId, this.form.value.comment, this.username).subscribe(() => {
      this.postsService.getPost(postId).subscribe(() => {
        this.form.reset();
        this.addComment(postId);
        this.switchShowComments(i);
      }, () => {}, () => {
        this.loader = false;
      });
    });
  }

  likePost(i: number, postId: string) {
    // let like: number;
    this.postsService.getPost(postId).subscribe(() => {
      this.postsService.likePost(postId, this.posts[i].likes).subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
    });
  }

  dislikePost(i: number, postId: string) {
    this.postsService.getPost(postId).subscribe(() => {
      this.postsService.dislikePost(postId, this.posts[i].likes).subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
    });
  }
}
