import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devisconfirmation',
  templateUrl: './devisconfirmation.component.html',
  styleUrls: ['./devisconfirmation.component.css']
})
export class DevisconfirmationComponent implements OnInit {
  selectedDevis: any;
  id;
  message;
  constructor(private adminService: AdminService, private router: ActivatedRoute) {
    this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    this.adminService.getDevisById(this.id).subscribe((res: any) => {
      const devis = res.data;
      console.log(res);
      let total = 0;
      devis.services.forEach((service, index) => {
        total += Number.parseInt(service.price) * devis.quantities[index]
      });
      devis.products.forEach((product, i) => {
        total += Number.parseInt(product.price) * devis.quantities[i];
      });
      devis.total = total;
      this.selectedDevis = res.data;
    });
  }

  actionBtnDevis(action) {
    this.selectedDevis.isConfirmed = action;
    this.adminService.updateDevis(this.id, this.selectedDevis).subscribe((res: any) => {
      console.log(res);
      if (res.msg === 'OK') {
        this.message = 'Votre action a été sauvegardée, merci';
      }
    });
  }

}
