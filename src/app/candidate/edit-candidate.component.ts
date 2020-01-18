import { Component, OnInit } from "@angular/core";
import { PortalService } from '../shared/portal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
    templateUrl: './edit-candidate.component.html',
    styles: [`
    form{color: royalblue}
    input{color: red}
    `]
})

export class EditComponent implements OnInit{
    EditCan: FormGroup;
    public candidate: any;
    public data;
    x: any;
    get accessor(): FormArray{
        return <FormArray>this.EditCan.get('accessor')
    }
    constructor(private portalService: PortalService,
        private route : ActivatedRoute, private fb: FormBuilder,
          private router: Router
        ){
          this.candidate = this.route.snapshot.data['candidate']
    }



    ngOnInit(){
       this.getCandidate(this.route.snapshot.params['id']);
      //  this.route.data.subscribe((candidate)=> {
      //    this.candidate = candidate,
      //    candidate.accessor.forEach((x)=> {
      //     this.accessor.push(this.fb.group(x))
      //     console.log(x);
      // })
      //  })

       this.EditCan = this.fb.group({
          //  surname: [],
          //  dep: [''],
          //  fac: [''],
          //  other: [''],
           accessor: this.fb.array([])
       })
    }

    getCandidate(id){
        this.portalService.getCandidate(id)
        .subscribe((data) => {
            this.candidate = data,
            // this.EditCan.patchValue({
            //     surname: data.surname,
            //     other: data.other,
            //     dep: data.dep,
            //     fac: data.fac
            // });
           data.accessor.forEach((x)=> {
               this.accessor.push(this.fb.group(x))
               console.log(x);
           })
            // this.candidateInfo(data)
            // this.candidate = data;

            // data.accessor.forEach(element => {
            //     this.accessors.push(element);
            // });
            // console.log(this.accessors[0].name, this.accessors[1].name);
            // console.log(this.accessors)


            // console.log(data)
            // console.log(data.accessor[0].name)
        })
    }

    // buildAccessors(): FormGroup{
    //     return this.fb.group({
    //         accessorname: '',
    //         accessoremail: '',
    //         university: '',
    //         status: 'invitationsent'
    //     })
    // }

    updateForm(){
        let id = this.route.snapshot.paramMap.get('id')
    this.portalService.updateCandidate(id, this.EditCan.value).subscribe((data)=> {
      this.router.navigate(['candidate-list'])
        console.log(data)
    })

    }


    // candidateInfo(data: any): void{
    //      this.data = data;

    //     this.EditCan.patchValue({
    //         surname : this.data.surname,
    //         other: this.data.other,
    //         email: this.data.email,
    //         dep: this.data.dep,
    //         fac: this.data.fac,
    //         date: this.data.date,

    //     })

    // }

    // buildAccessors(): FormGroup{
    //     return this.fb.group({
    //         accessorname: '',
    //         accessoremail: '',
    //         university: '',
    //         status: 'invitationsent'
    //     })
    // }

}

