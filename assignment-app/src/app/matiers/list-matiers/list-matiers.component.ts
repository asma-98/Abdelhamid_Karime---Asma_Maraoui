import { Component,NgZone, OnInit ,ViewChild} from '@angular/core';
import {Matiere} from '../../models/matiere'
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import {MatiereService} from '../../services/matiere.service';
import {Image} from '../../models/image';



@Component({
  selector: 'app-list-matiers',
  templateUrl: './list-matiers.component.html',
  styleUrls: ['./list-matiers.component.css']
})
export class ListMatiersComponent implements OnInit {

  matieres: Matiere[];
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  page: Number;
  nextPage: Number = 1;
  limit: Number = 10;
  countAssignments: Number;

  constructor(private matiereService: MatiereService,
    private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getMatieres();
  //this.getAssignments();
  }

  private getMatieres(){
    this.matiereService.getMatieresList(localStorage.getItem('tok')).subscribe(data => {
      this.matieres=data;
      console.log(data)

    });
  }

  matiereDetails(id: number){
    this.router.navigate(['matiereDetails',id]);
  }

  updateMatiere(id: number){

    this.router.navigate(['updateMatiere', id]);

  }

  deleteMatiere(id: number){


    this.matiereService.deleteMatiere(id).subscribe( data => {
      this.getMatieres();
    })

  }



  // getAssignments() {
  //   if (!this.nextPage) return;
  //   this.matiereService
  //     .getMatiersPagine(this.nextPage, this.limit)
  //     .subscribe((data: any) => {
  //       this.page = data.page;
  //       this.nextPage = data.nextPage;
  //       this.countAssignments = data.totalDocs;
  //       this.matieres = this.matieres.concat(data.docs);
  //       console.log(data)
  //     });
  // }

  // ngAfterViewInit() {
  //   console.log('After view init');
  //   this.scroller
  //     .elementScrolled()
  //     .pipe(
  //       // on transforme les evenements en distances par rapport au bas du scroll
  //       map((e) => {
  //         return this.scroller.measureScrollOffset('bottom');
  //       }),
  //       tap((val) => {
  //         //console.log(val);
  //       }),
  //       pairwise(),
  //       filter(([y1, y2]) => {
  //         return y2 < y1 && y2 < 140;
  //       }),
  //       throttleTime(200) // on n'enverra un subscribe que toutes les 200ms (on ignorera les evenements entre...)
  //     )
  //     .subscribe((_) => {
  //       console.log(
  //         "...Dans subscribe du scroller, je charge plus d'assignments"
  //       );
  //       this.ngZone.run(() => {
  //         //this.addMoreAssignments();
  //         this.getAssignments(); // déjà prêt car nextPage re-initialisé à chaque requête
  //       });
  //     });
  // }

}
