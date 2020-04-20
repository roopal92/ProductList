import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;
  errorMessage = '';
 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
  }

  getProduct(id: number) {  
    this.productService.getProduct(id).subscribe({
    next: product => this.product = product,
    error: err => this.errorMessage = err
  });
 }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
    /*let id=+this.route.snapshot.paramMap.get('id');
    //reading a parameter into a variable
    this.pageTitle+=`:${id}`; //tilde operator
    this.product = { 
      'productId': id,
       'productName': 'Leaf Rake',
        'productCode': '1GON-0011',
         'releaseDate': 'March 19, 2019', 
         'description': 'Leaf rake with 48-inch wooden handle.', 
         'price': 19.95,
          'starRating': 3.2, 
          'imageUrl': 'assets/images/leaf_rake.png' 
    }*/
  }

   onBack():void{
    this.router.navigate(['/products']);
  }

}
