import { Component, inject, OnInit, signal } from '@angular/core';
import { DeleteConfirmation } from '../../shared/delete-confirmation/delete-confirmation';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../core/models/classes/Master.model';
import { MasterService } from '../../core/services/master';
import { CommonModule } from '@angular/common';
import { MasterNavigation } from "../../shared/master-navigation/master-navigation";
import { Delete } from "../delete/delete";


@Component({
  selector: 'app-role-master',
  imports: [ReactiveFormsModule, CommonModule, Delete],
  templateUrl: './role-master.html',
  styleUrl: './role-master.css',
})

export class RoleMaster implements OnInit {

  roleForm!: FormGroup;
  roleList = signal<Role[]>([]);

  currentTabVisiable = signal<string>("Role");
  deleteType: 'ROLE' | null = null;

  selectedDeleteId: number | null = null;

  deleteId: number | null = null;

  fb = inject(FormBuilder);
  mastersrv = inject(MasterService);

  constructor() {
    this.createRoleForm();
  }

  ngOnInit(): void {
    console.log('Role loaded');
    this.getAllRole();

  }

  toggleForm(tabName: string) {
    this.currentTabVisiable.set(tabName)
  }

  createRoleForm() {
    this.roleForm = new FormGroup({
      roleId: new FormControl(0),
      roleName: new FormControl('')
    })
  }


  getAllRole() {
    this.mastersrv.getAllRoles().subscribe(res => {
      this.roleList.set(res.data);
    });
  }

  onDeleteRole(id: number) {
    this.mastersrv.deleteRole(id).subscribe(() => {
      this.getAllRole();
    });
  }

  onUpdateRole() {
    const formValue = this.roleForm.value;
    this.mastersrv.updateRole(formValue).subscribe({
      next: () => {
        alert("Role updated");
        const editRec = this.roleList().find(m => m.roleId == formValue.roleId);
        if (editRec !== undefined) {
          editRec.roleName = formValue.roleName;
        }
        this.getAllRole();
      }
    });
  }


  onRoleEdit(roleData: Role) {
    this.roleForm.patchValue(roleData) //reininitialize the value
  }

  onSaveRole() {
    const formValue = this.roleForm.value;
    this.mastersrv.createRole(formValue).subscribe({
      next: () => {
        alert("Role saved");
        // this.roleForm.reset({ roleId: 0, roleName: '' });
        this.getAllRole();
        this.roleForm.reset()
      }
    });
  }

}
