import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();
  private likeNumber: number;

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        API_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              this.likeNumber = post.likes;
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                username: post.username,
                likes: post.likes,
                dislikes: post.likes,
                comments: post.comments
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        // console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      username: string;
      likes: number;
      comments: [];
    }>(API_URL + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title: title, content: content };
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        API_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/home']);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(API_URL + postId);
  }

  updatePost(id: string, title: string, content: string, image: string | File) {
    let postData: FormData | Post;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = { id: id, title: title, content: content, imagePath: image, creator: null, username: null };
    }
    this.http
      .put(API_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/home']);
      });
  }

  likePost(postId: string, likes: number) {
    const postData = { id: postId, likes: likes };
    return this.http.patch(API_URL + 'like/' + postId, postData);
  }

  dislikePost(postId: string, likes: number) {
    const postData = { id: postId, likes: likes };
    return this.http.patch(API_URL + 'dislike/' + postId, postData);
  }

  addComment(id: string, comment: string) {
    // console.log("addComment")
    const postData = {
      id: id,
      comment: comment
    }
    return this.http.patch(API_URL + 'comment/' + id, postData);
  }
}
