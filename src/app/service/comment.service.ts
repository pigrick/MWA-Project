import { Injectable } from '@angular/core';
import { Comment } from '../class/comment.class';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CommentService{
    constructor(private http: HttpClient){}
    
    getComments():Observable<Comment[]> {
        return this.http.get<Comment[]>('http://localhost:3000/comments');
    }

    deleteComment(id:String) {
        return this.http.delete('http://localhost:3000/comments/delete/' + id);
    }

    getComment(id: String):Observable<Comment> {
        return this.http.get<Comment[]>('http://localhost:3000/comments').mergeMap(comment => comment).filter(comment => comment._id === id);
    }

    getCommentByPost(id: String):Observable<Comment[]> {
        return this.http.get<Comment[]>('http://localhost:3000/comments/post/' + id);
    }

    createComment(comment: Comment) {
        comment.dateCreated = new Date();
        comment.username = localStorage.getItem('username');
        return this.http.post('http://localhost:3000/comments/create', comment);
    }
}