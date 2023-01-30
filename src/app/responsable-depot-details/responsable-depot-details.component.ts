import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DepotserviceService } from '../services/depotservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-responsable-depot-details',
  templateUrl: './responsable-depot-details.component.html',
  styleUrls: ['./responsable-depot-details.component.css']
})
export class ResponsableDepotDetailsComponent implements OnInit {

  @ViewChild('reparationEncours', { static: false }) reparationEncours!: CdkDropList<any>;
  @ViewChild('reparationFini', { static: false }) reparationFini!: CdkDropList<any>;



  idDepot: string = '';
  listReparationNonEntamer: any = [];
  listReparationEncours: any = [];
  listReparationFait: any = [];
  listResponsable: any = [];
  selectedReparation: string = "";
  selectedResponsable: string = "";
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private depotService: DepotserviceService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const idd = this.route.snapshot.paramMap.get("idDepot");
    if (idd) {
      this.idDepot = idd;
      this.getListReparationNonEntamer();
      this.getListReparationEncours();
      this.getListReparationTermine();
      this.getDetails();
    }
    this.getListResponsable();
  }

  detailsDepot: any;
  getDetails(): void {
    this.depotService.getDetailsDepot(this.idDepot).subscribe((resultat) => {
      this.detailsDepot = resultat;
    }, (error) => {

    });
  }

  drop(event: CdkDragDrop<any[]>) {
    // console.log(event.previousContainer.id);
    console.log(event.container.id);
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    //moveItemInArray(this.listReparationNonEntamer, event.previousIndex, event.currentIndex);
  }

  ajoutRepGroup = this._formBuilder.group({
    libelle: ['', Validators.required],
    prix: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    updateIfExiste: ['']
  });


  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<any>) {
    return item.data.Responsable === null || item.data.Responsable === null;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  formatPourcentage(value: number): string {
    return `${value}%`;
  }



  ajouterReparation(): void {
    if (this.ajoutRepGroup.status === "VALID") {
      const libelle = this.ajoutRepGroup.get('libelle')?.value;
      const prix = this.ajoutRepGroup.get('prix')?.value;
      const updateIfExiste = this.ajoutRepGroup.get('updateIfExiste')?.value === "true";

      this.depotService.ajouterReparation(libelle, prix, this.idDepot, updateIfExiste).subscribe((result) => {
        console.log("result", result);
        this._snackBar.open("Réparation ajoutée avec succes.", "", {
          duration: 300
        });
        this.ajoutRepGroup.setValue({
          libelle: "",
          prix: 0,
          updateIfExiste: "false"
        });
        this.getListReparationNonEntamer();
      }, (error) => {
        console.log("error", error);
      });
    } else {
      console.log("form invalid", this.ajoutRepGroup);
    }
  }

  assignerResponsable(): void {
    console.log("selected" , this.selectedResponsable, this.selectedReparation);
    const idResp = this.selectedResponsable;
    const idRep = this.selectedReparation;
    this.depotService.assignerResponsable(idRep, idResp).subscribe((result) => {
      this._snackBar.open("Assignation fait avec succes.", "", {
        duration: 300
      });
      this.getListReparationNonEntamer();
    }, (error) => {
      this._snackBar.open("Une erreur s'est produite durant l'assignation du responsable.", "", {
        duration: 300
      });
    });
  }

  commencerTache(idReparation: string): void {
    this.depotService.entamerReparation(idReparation).subscribe((resultat) => {
      this._snackBar.open("Tâche commencé avec succes.", "", {
        duration: 300
      });
      this.getListReparationNonEntamer();
      this.getListReparationEncours();
    }, (error) => {
      console.log(error);
      this._snackBar.open("Ajout de la tâche échoué.", "", {
        duration: 300
      });
    });
  }

  onSelectRespChange(event: any): void {
    this.selectedResponsable = event.target.value;
  }

  onSelectRepChange(event: any): void {
    this.selectedReparation = event.target.value;
  }

  getListReparationNonEntamer(): void{
    this.depotService.getListReparationNonEntamer(this.idDepot).subscribe((resultat) => {
      this.listReparationNonEntamer = resultat;
    }, (error) => {
      console.log("Une erreur s'est produit", error);
    });
  }

  getListReparationEncours(): void{
    this.depotService.getListReparationEncours(this.idDepot).subscribe((resultat) => {
      this.listReparationEncours = resultat;
    }, (error) => {
      console.log("Une erreur s'est produit", error);
    });
  }

  getListReparationTermine(): void{
    this.depotService.getListReparationTermine(this.idDepot).subscribe((resultat) => {
      this.listReparationFait = resultat;
    }, (error) => {
      console.log("Une erreur s'est produit", error);
    });
  }

  getListResponsable(): void {
    this.depotService.getResponsable().subscribe((resultat) => {
      this.listResponsable = resultat;
    }, (error) => {
      console.log("error get list responsable", error);
    })
  }


  updateAvancement(idReparation: string): void {
    this.depotService.mettreAjourAvancement(idReparation, 100).subscribe((resultat) => {
      this._snackBar.open("Mise à jour réussite.", "", {
        duration: 500
      });
      this.getListReparationEncours();
      this.getListReparationTermine();
    }, (error) => {
      this._snackBar.open("Une erreur s'est produite pour la mise à jour avancement.", "", {
        duration: 500
      })
    });
  }



}
