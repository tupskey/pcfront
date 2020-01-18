import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { PortalService } from '../shared/portal.service';

  import { ICandidate } from './candidate.model';
import { Observable } from 'rxjs';
import { Toastr, TOASTR_TOKEN } from '../shared/toastr.service';

@Component({
    templateUrl: './candidate-list.component.html',
    styles: [`
        h4{text-align: center; margin-top: 20px;}
        td{font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;}
        .my-pagination /deep/ .ngx-pagination .current {
        background: red;
  }
  .custom-pagination {
  text-align: center;
  width: 100%;
  margin: 20px auto 5px auto;
  background-color: rgba(58, 56, 56, 0.685);
  padding: 10px;
}
.custom-pagination .page-number {
  display: inline-block;
  margin: 0px 4px;
  border-radius: 25px;
}
.page-number.current {
  color: red;
}
.page-number span {
  display: block;
  width: 28px;
  height: 28px;
  font-size: 18px;
  cursor: pointer;
}
.pagination-previous,.pagination-next{
  display: inline-block;
  font-weight: bold;
}
    `]
})

export class CandidateListComponent implements OnInit{
    p: number = 1;
    Candidates:ICandidate[] = [];
    filteredCandidates: ICandidate[] = [];
    _listFilter: string;


    public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'prev',
      nextLabel: 'next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  config = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: this.filteredCandidates.length
  };

    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter = value;
      this.filteredCandidates = this.listFilter ? this.performFilter(this.listFilter) : this.Candidates;
    }
    constructor(private router: Router, private portalService : PortalService, private route: ActivatedRoute, @Inject(TOASTR_TOKEN)private toastr: Toastr){
      this.filteredCandidates = this.Candidates;
      this.listFilter = ''
    }

    ngOnInit(){
        this.portalService.getCandidates().subscribe((data)=> {
             this.Candidates = data;
            this.filteredCandidates = data;
        })
        this.Candidates = this.route.snapshot.data['Candidates'];

    }



    removeCandidate(candidate: ICandidate, i:number){
        if(window.confirm('Are you sure you want to delete this Candidate?')){
            this.portalService.deleteCandidate(candidate._id).subscribe((data) => {
                this.Candidates.splice(i, 1);
                this.toastr.error(candidate.surname + ' ' +' has been removed succesfully');

            })
        }
    }

    performFilter(filterBy: string): ICandidate[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.Candidates.filter((candy:ICandidate) =>
        candy.surname.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }

}
