import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  message;
  productsList;
  selectedProduct: any;
  productForm: FormGroup;
  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit() {
    this.adminService.getListProducts().subscribe((data: any) => {
      this.productsList = data.data;
      this.adminService.productsList = data.data;
    });
  }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addProduct(form) {
    console.log(form.value);
    if (form.valid) {
      this.adminService.addProduct(form.value).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();

      });
    }
  }
  updateProduct(form) {
    console.log(form.value);
    if (form.valid) {
      this.adminService.updateProduct(form.value, this.selectedProduct._id).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();
      });
    }
  }

  selectProduct(product) {
    this.selectedProduct = product;
    console.log(product);
    this.productForm.controls.name.setValue(this.selectedProduct.name);
    this.productForm.controls.type.setValue(this.selectedProduct.type);
    this.productForm.controls.price.setValue(this.selectedProduct.price);
    this.productForm.controls.desc.setValue(this.selectedProduct.desc);
  }


  archiveBtn(form) {
    form.value.isArchived = true;
    this.adminService.updateProduct(form.value, this.selectedProduct._id).subscribe((res: any) => {
      console.log(res);
      this.message = res.msg;
      this.ngOnInit();
    });

  }
}
