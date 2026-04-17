import { Component } from '@angular/core';
import { IRole } from '../../core/models/interface/Role.model';

@Component({
  selector: 'app-roles',
  imports: [],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  roleList: IRole[] = [];
}
