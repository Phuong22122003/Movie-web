import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommnetService } from '../../../service/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() movieId!: number;
  comments: Comment[] = [];
  @ViewChild('commentInput') commentInput!: ElementRef<HTMLInputElement>;
  constructor(private commentService: CommnetService) { }
  loadComments() {
    this.commentService.getAll(this.movieId).subscribe(comments => {
      this.comments = comments;
    });
  }
  ngOnInit() {
    this.loadComments();
  }
  addComment(content: string) {
    if (!content || content.trim() === '') {
      return;
    }
    console.log(this.movieId);
    
    const commentRequest = {
      userId: '1',
      movieId: this.movieId,
      comment: content
    };
    this.commentService.addComment(commentRequest).subscribe(comment => {
      this.comments.push(comment);
      this.commentInput.nativeElement.value = '';
    });
  }
}
