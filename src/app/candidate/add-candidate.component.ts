import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { PortalService } from '../shared/portal.service';
import { TOASTR_TOKEN ,Toastr } from '../shared/toastr.service';


@Component({
    templateUrl: './add-candidate.component.html',
    styles: [`

/* *{background-color: transparent; color: royalblue; } */
 select.custom-select{ background-color:transparent}
    button{background-color: royalblue; border: none; color: white}
    #but{width: 240px}
    #but2{width: 240px; background-color: red}
    h2{text-align: center; margin-top: 24px; color: royalblue}
    h5{text-align: center; color: royalblue}
    hr{background-color: darkred}
    input.form-control{background-color: navy; color: white}
    /* :host{display:block; background-color: navy} */
    `]
})

export class AddCandidateComponent implements OnInit{
    Submitted = false
    AddCandidate: FormGroup
    Department: any = ['Computer Science & Engineering', 'Microbiology', 'Law', 'Geography'];
    Level: any = ['Lecuturer I', 'Lecturer II', ' Senior Lecturer I', 'Senior Lecturer II', 'Reader'];
    Faculty: any = ['Faculty of Technology', 'Faculty of Agriculture', 'Faculty of Social Sciences', 'Faculty of Environmental Design Management', 'Faculty of Pharmacy'];


    get accessor(): FormArray{
        return <FormArray>this.AddCandidate.get('accessor')
    }

    constructor(private fb: FormBuilder, private router: Router,
       private portalService: PortalService,@Inject(TOASTR_TOKEN) private toastr: Toastr){
        this.mainForm();
    }

    ngOnInit(){}
    mainForm(){
        this.AddCandidate = this.fb.group({
            surname: ['', Validators.required],
            other: ['',  Validators.required],
            email: ['',  Validators.required],
            number: ['',  Validators.required],
            fac: ['',  [Validators.required]],
            dep: ['',   Validators.required],
            lev: ['',  Validators.required],
            date: ['', Validators.required],
            accessor: this.fb.array([ this.buildAccessors() ])
        })
    }


    onSubmit(){
        this.Submitted = true;
        if(!this.AddCandidate.valid){
            return false
        }else{
           this.portalService.addCanidate(this.AddCandidate.value).subscribe(data => {
            if(data){
                console.log(data);

            }
            else{
                console.log('Invalid')
            }
        },(error) => {
               console.log(error)
           })
        }
        console.log(this.AddCandidate.value)
        this.router.navigate(['candidate-list']);
        this.toastr.success('Candidate Sucessfully registered')

    }

    buildAccessors(): FormGroup{
        return this.fb.group({
            accessorname:  ['', Validators.required],
            accessoremail:  ['', Validators.required],
            university:  ['', Validators.required],
            status: 'invitationsent'
        })
    }

    changeFaculty(e) {
        this.AddCandidate.get('fac').setValue(e, {
         onlySelf: true
        })
       }
    changeDepartment(e) {
        this.AddCandidate.get('dep').setValue(e, {
         onlySelf: true
        })
       }
     changeLevel(e) {
        this.AddCandidate.get('lev').setValue(e, {
         onlySelf: true
        })
     }

     addAccessors(): void{
        this.accessor.push(this.buildAccessors());
     }

      back(){
          window.alert('are you sure you want to cancel')
          this.router.navigate(['/dashboard'])
      }

}
