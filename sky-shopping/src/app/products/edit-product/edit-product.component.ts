import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { ProductService } from '../products.service';
import { select, Store } from '@ngrx/store';
import { LoaderAction } from 'src/app/loader/loader.reducer';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile!: File;
  task!: AngularFireUploadTask;
  url!: string;
  basePath = '/images';
  progressValue!: Observable<number | undefined>;
  loader!: Observable<boolean>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly storage: AngularFireStorage,
    private readonly store: Store<any>,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loader = this.store.pipe(select((state) => state.loader.isOn));
    this.store.dispatch({ type: LoaderAction.START });
    this.onInit();
  }

  onInit = () => {
    this.productForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      unitPrice: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000),
        ],
      ],
    });
    this.store.dispatch({ type: LoaderAction.STOP });
  };

  onSubmit = (productForm: FormGroup) => {
    console.log('Product form', productForm, this.url);
    this.productService
      .createProduct({
        name: productForm.value.name,
        unitPrice: productForm.value.unitPrice,
        imageUrl: this.url,
        description: productForm.value.description,
      })
      .subscribe({
        next: (response) => {
          console.log('Response', response);
        },
        error: (error) => {
          window.alert(error);
        },
        complete: () => {
          this.router.navigate(['/admin/products']);
        },
      });
  };

  onFileSelected = async (event: any) => {
    console.log('File changes');
    var n = Date.now();
    this.selectedFile = event.target.files[0];

    const filePath = `${this.basePath}/${n}-${this.selectedFile.name}`;
    this.task = this.storage.upload(filePath, this.selectedFile);

    this.progressValue = this.task.percentageChanges();
    (await this.task).ref.getDownloadURL().then((url: any) => {
      this.url = url;
    });
  };
}
