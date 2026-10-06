import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientService } from '../../../core/services/client/client-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { ClientModel } from '../../../core/models/classes/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-client-list',
  styleUrl: './client-list.css',
  templateUrl: './client-list.html',
})
export class ClientList implements OnInit, OnDestroy{

  clientSrv=inject(ClientService)
  clientList:WritableSignal<ClientModel[]>=signal<ClientModel[]>([])
  subscription!:Subscription

  ngOnInit(): void {
    this.getAllClients()
  }

  getAllClients(){
    this.subscription=this.clientSrv.getAllClients().subscribe({
      next:(res:API_Response)=>{
        this.clientList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
