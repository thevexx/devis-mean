import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { isNumber } from 'util';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-demande-devis',
  templateUrl: './demande-devis.component.html',
  styleUrls: ['./demande-devis.component.css', '../../assets/css/login.css']
})
export class DemandeDevisComponent implements OnInit {
  // @HostBinding('class') classes = 'bg-color';
  devisForm: FormGroup;
  message = '';
  productsList = [];
  servicesList = [];
  selectedServices = [];
  selectedProducts = [];
  isSubmitted = false;
  quantities = [];

  constructor(private authService: AuthService, private adminService: AdminService) {
    this.devisForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(10000000), Validators.max(99999999)]),
      company: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dateLimit: new FormControl('', []),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // isNumber()
    this.adminService.getListProducts().subscribe((data: any) => {
      this.adminService.productsList = data.data;
      this.productsList = data.data;
    });
    this.adminService.getListServices().subscribe((data: any) => {
      this.adminService.servicesList = data.data;
      this.servicesList = data.data;
    });
  }

  createDevisBtn(form) {
    console.log(form.value);
    this.isSubmitted = true;
    if (form.valid) {
      if (this.selectedServices.length !== 0) {
        form.value.services = this.selectedServices.map(val => val._id);
        form.value.quantities = this.quantities;
      } else if (this.selectedProducts.length !== 0) {
        form.value.products = this.selectedProducts.map(val => val._id);
        form.value.quantities = this.quantities;
      } else {
        this.message = 'Vous devez sélectionner au moins un service ou produit !';
        return;
      }
      console.log(form.value);
      this.authService.createDevis(form.value).subscribe((res: any) => {
        console.log(res);
        if (res.msg === 'OK') {
          this.message = 'Merci pour votre devis, un email de confirmation vous a été envoyé, veuillez vérifier votre boîte de réception';
        }
      });
    }
  }
  addSelectedService(service) {
    if (this.servicesList.length === 0) {
      return;
    }
    if (this.selectedServices.indexOf(this.servicesList[service.selectedIndex]) === -1) {
      this.selectedServices.push(this.servicesList[service.selectedIndex]);
      this.quantities.push(1);
    }
  }
  removeSelectedService(i) {
    this.selectedServices = this.selectedServices.filter((item, index) => index !== i);
    this.quantities = this.quantities.filter((item, index) => index !== i);
  }
  addSelectedProduct(product) {
    if (this.productsList.length === 0) {
      return;
    }
    console.log(this.servicesList[product.selectedIndex]);
    if (this.selectedProducts.indexOf(this.productsList[product.selectedIndex]) === -1) {
      this.selectedProducts.push(this.productsList[product.selectedIndex]);
      this.quantities.push(1);
    }
  }
  removeSelectedProduct(i) {
    this.selectedProducts = this.selectedProducts.filter((item, index) => index !== i);
    this.quantities = this.quantities.filter((item, index) => index !== i);
  }
  changedQuantity(i, quantity) {
    this.quantities[i] = quantity;
  }

}
