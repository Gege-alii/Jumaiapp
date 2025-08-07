import { Component, OnInit, OnDestroy , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  images: string[] = [];
  currentIndex: number = 0;
  intervalId: any;
  categories: string[] = [];
   bestSellers: any[] = [];
   productss:any[] = [];
   sale:any[] = [];
    remainingHours: number = 0;
  remainingMinutes: number = 0;
  remainingSeconds: number = 0;
  private countdownInterval: any;
    allProducts: any[] = [];
  displayedProducts: any[] = [];
   @ViewChild('scrollContainer') scrollContainer!: ElementRef;
     hover: boolean = false;


  private endTime = new Date().getTime() + 72 * 60 * 60 * 1000;
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchImages();
    this.intervalId = setInterval(() => this.nextSlide(), 3000);

      this.http.get<string[]>('https://fakestoreapi.com/products/categories')
      .subscribe(data => {
        this.categories = data;
      });

        this.http.get('https://fakestoreapi.com/products?limit=6').subscribe((data: any) => {
      this.bestSellers = data;
    });

        this.http.get('https://fakestoreapi.com/products?limit=12').subscribe((data: any) => {
      this.sale = data;
    });

    this.http.get<any[]>('https://fakestoreapi.com/products?limit=6').subscribe(data => {
  this.productss = data;
});


     this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endTime - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.remainingHours = 0;
        this.remainingMinutes = 0;
        this.remainingSeconds = 0;
        return;
      }

      this.remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);

     

  }

  fetchImages() {
    this.http.get<any[]>('https://fakestoreapi.com/products/?limit=5')
      .subscribe(data => {
        this.images = data.map(product => product.image);
      });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
     clearInterval(this.countdownInterval);
  }

   getImageUrl(category: string): string {
     const fileName = category
    .toLowerCase()
    .replace(/\s+/g, '-')      
    .replace(/'/g, '');        

  return `assets/images/${fileName}.png`;
  }

 ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.style.scrollBehavior = 'smooth';
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -600, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 600, behavior: 'smooth' });
  }

  
}
