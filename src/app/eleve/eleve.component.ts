import { Component, OnInit } from '@angular/core';
import { EleveService } from '../sevices/eleve.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-enseignant',
  templateUrl: './eleve.component.html',
  styleUrl: './eleve.component.css'
})
export class EleveComponent {
  addeleveform! : FormGroup;
  updateel! : FormGroup;
  errormessage : any;
  eleve: any[]= [];

  btnadd  = false;
  updatebtn = false;

  constructor(private eleveservice : EleveService,
              private fb : FormBuilder,
              private router : Router
                  
    ) {}

    ngOnInit(): void {
      this.addeleveform= this.fb.group(
        {
          username : this.fb.control(""),
          password : this.fb.control(""),
          email : this.fb.control(""),
          id : this.fb.control(""),
          userClass : this.fb.control("")
        },
     
      ),
      this.getel()

      }

   
   
   
      updateform(elid:any){
        this.updatebtn = true;
        this.updateel= this.fb.group(
          {
            username : this.fb.control(elid.username),
            password : this.fb.control(elid.password),
            email : this.fb.control(elid.email),
            id : this.fb.control(elid._id),
            userClass : this.fb.control(elid.userClass)

          },        
        )
      }

      addel() {
        let username= this.addeleveform.value.username;
        let password= this.addeleveform.value.password;
        let email= this.addeleveform.value.email;
        let userClass = this.addeleveform.value.userClass;
        this.eleveservice.addeleve(username, password,email,userClass).subscribe(
          (response) => {
           
            console.log('ajout avec succes:', response);
            window.location.reload();
          },
          (error) => {
         
            console.error('erreur a lajout:', error);
          }
        );
      }

      addform(){
        this.btnadd = !this.btnadd;
      }
      
      update(){

        let username= this.updateel.value.username;
        let password= this.updateel.value.password;
        let email= this.updateel.value.email;
        let id= this.updateel.value.id;
        let userClass= this.updateel.value.userClass;


        this.eleveservice.updateeleve(id,username, password,email,userClass).subscribe(
          (response) => {
            console.log('modifié avec succes:', response);
            window.location.reload();
          },
          (error) => {
            console.error('erreur a la modification:', error);
          }
        );

      }

      getel() {
        this.eleveservice.getEleve().subscribe(
          (eleve: any[]) => {
            this.eleve = eleve;
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
      }


      deleteel(elid: string) {
          this.eleveservice.deleteeleve(elid).subscribe(
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
