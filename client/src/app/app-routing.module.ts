import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
