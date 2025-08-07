import { Component, OnInit ,  ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
   styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
    sale:any[] = [];
     bestSellers: any[] = [];
   productss:any[] = [];
    private countdownInterval: any;
    allProducts: any[] = [];
  displayedProducts: any[] = [];
   @ViewChild('scrollContainer') scrollContainer!: ElementRef;
     hover: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe((data: any) => {
        this.product = data;
      });
    }

         this.http.get('https://fakestoreapi.com/products?limit=12').subscribe((data: any) => {
      this.sale = data;
    });

  }

    scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -600, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 600, behavior: 'smooth' });
  }
}
