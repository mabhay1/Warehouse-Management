import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientModel } from '../../../core/models/classes/client.model';
import { ClientService } from '../../../core/services/client/client-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [NgClass,DatePipe,RouterLink],
  selector: 'app-client-list',
  styleUrl: './client-list.css',
  templateUrl: './client-list.html',
})
export class ClientList implements OnInit {

  isCardView:boolean= false

  clientList:WritableSignal<ClientModel[]> =signal<ClientModel[]>([])

  clientSrv = inject(ClientService)
  router=inject(Router)

  ngOnInit(): void {
    this.getAllClients()
  }

  getAllClients(){
    this.clientSrv.getAllClients().subscribe({
      next:(res:API_Response)=>{
        this.clientList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onEdit(id:number){
    this.router.navigateByUrl('/admin/client-form/'+id)
  }
  onDelete(id:number){
    const isConfirm=confirm("Are you sure want to delete!!")
    if(isConfirm){
      this.clientSrv.deleteClient(id).subscribe({
        next:(res:API_Response)=>{
          if(res.result){
            alert(res.message)
            this.getAllClients()
          }
          else{
            alert(res.message)
          }
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      })
    }
  }


}
