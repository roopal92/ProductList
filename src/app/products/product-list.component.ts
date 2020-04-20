import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
    
export class ProductListComponent implements OnInit{
   
    pageTitle: string="Product list";
    imageWidth: number= 50;
    imageMargin: number= 2;
    showImage : boolean=false; 
    _listFilter: string;
    filteredProducts: IProduct[];
    errorMessage: string;
    constructor(private productService:ProductService){
       
    }

    products:IProduct[]=[]; // we removed the hardcoded values
    ngOnInit(): void {
        console.log("in onIt method");
        this.productService.getProducts().subscribe({
            next: products =>{this.products=products
                this.filteredProducts=this.products;},
            error: err =>this.errorMessage = err
        });
       
    }

    onRatingClicked(message:string) : void{
        this.pageTitle='Product List: ' + message;
    }

    get listFilter(): string {
         return this._listFilter; 
        }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredProducts= this.listFilter ?
         this.performFilter(this.listFilter) : this.products; 
    }   
    performFilter(filterBy: string): IProduct[] {
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) =>
         product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } 

    
    toggleImage():void{
        this.showImage =!this.showImage;
    }

    
}