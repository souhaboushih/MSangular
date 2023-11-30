import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from '../sevices/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrl: './enseignant.component.css'
})
export class EnseignantComponent {
  addensform! : FormGroup;
  updatef! : FormGroup;
  errormessage : any;
  enseign: any[]= [];
  ens!: string;

  btnadd  = false;
  updatebtn = false;

  constructor(private addservice : UserService,
              private fb : FormBuilder,
              private router : Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              
              
    ) {}

    ngOnInit(): void {
      this.addensform= this.fb.group(
        {
          username : this.fb.control(""),
          password : this.fb.control(""),
          email : this.fb.control(""),
          id : this.fb.control("")
        },
     
      ),
      this.getens()

      }

   
   
   
      updateform(ensid:any){
        this.updatebtn = true;
        this.updatef= this.fb.group(
          {
            username : this.fb.control(ensid.username),
            password : this.fb.control(ensid.password),
            email : this.fb.control(ensid.email),
            id : this.fb.control(ensid._id)
          },        
        )
      }

      addens() {
        let username= this.addensform.value.username;
        let password= this.addensform.value.password;
        let email= this.addensform.value.email;
        this.addservice.addenseignant(username, password,email).subscribe(
          (response) => {
            // Handle successful login
            console.log('ajout avec succes:', response);
            window.location.reload();
          },
          (error) => {
            // Handle login error
            console.error('erreur a lajout:', error);
          }
        );
      }

      addform(){
        this.btnadd = !this.btnadd;
      }
      
      update(){

        let username= this.updatef.value.username;
        let password= this.updatef.value.password;
        let email= this.updatef.value.email;
        let id= this.updatef.value.id;

        this.addservice.updateens(id,username, password,email).subscribe(
          (response) => {
            // Handle successful login
            console.log('modifié avec succes:', response);
            window.location.reload();
          },
          (error) => {
            // Handle login error
            console.error('erreur a la modification:', error);
          }
        );

      }

      getens() {
        this.addservice.getEnseign().subscribe(
          (enseign: any[]) => {
            this.enseign = enseign;
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
      }


      deleteens(ensid: string) {
          this.addservice.deleteens(ensid).subscribe(
            (response: { message: string }) => {
              console.log(response.message);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error delete enseign:', error);
            }
          );
        }
      

}
