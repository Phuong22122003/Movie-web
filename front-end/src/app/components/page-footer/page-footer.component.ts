import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../models/page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-footer',
  imports: [CommonModule],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.scss'
})
export class PageFooterComponent {
  @Input() page!: Page;
  @Output() pageChange = new EventEmitter<number>();
  get totalPages(): number {
    return Math.ceil(this.page.total / this.page.pageSize);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.page.currentPage;
    const delta = 1;
    const pages: number[] = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.page.currentPage) {
      this.pageChange.emit(page);
    }
  }

  prevPage() {
    this.goToPage(this.page.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.page.currentPage + 1);
  }
}
