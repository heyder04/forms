import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, delay, Observable } from 'rxjs';
import { AuthResponse } from './auth-response';
import { Myenum2 } from './myenum';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CategoryService]
})
export class AppComponent {
  text:string=""
  excelData:any
  name='Max';
  error2:string="dfhsfd"
  error:string="dfsfd"
  loading=false
  isLoginMode: Boolean=true
  title = 'forms';
  categories:any
  model:any={category:""}
  constructor(private categorys:CategoryService,private auth:AuthService,public translate:TranslateService){
   
  }
  ngOnInit(){
   console.log(Object.keys(Myenum2).filter(k=>k))
  }
  Myenum(Myenum: any): any {
    throw new Error('Method not implemented.');
  }

  closeDD(e:any){
    this.error2=e
  }

  object={
    a:1,
    b:2,
    c:3
  }
  movieForm =new FormGroup({
    newtitle:new FormControl("Film adi",[Validators.required,Validators.minLength(5)]),
    description:new FormControl("aciklama"),
    img:new FormControl("1.jpeg"),
    category2:new FormControl("2"),
  })
  Create(form:NgForm){
  
    // const category2={
    //   id:this.title.value,
    //   name:this.description.value
    // }
    // this.categorys.createM(category2).subscribe(data=>console.log(data))

  
  console.log(this.movieForm.value)
}
Link(link:any){
  const blob1=new Blob(["hello guys"],{type:"text/plain"})
link.href=URL.createObjectURL(blob1)
}
Link2(link2:any){
 const blob2=new Blob([this.makeCSV()])
 link2.href=URL.createObjectURL(blob2)
}
makeCSV(){
  const data=[["col1","col2","col3"],[1,2,3],[4,5,6]]
  return data.map(r=>r.join(",")).join("\n");
}


ReadExcel(event:any){
console.log(this.text)
let file=event.target.files[0]
let fileReader=new FileReader()
fileReader.readAsBinaryString(file)
fileReader.onload=(e)=>{
  let workbook=XLSX.read(fileReader.result,{type:"binary"});
  let sheetNames=workbook.SheetNames;
  this.excelData=XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

 this.text=this.excelData.map((x:any)=>x.fin).join(",")
  console.log(event.target.value)
 event.target.value=null
  console.log(this.text)
   console.log(this.excelData)
}
}


// Change(e:any){
//   this.text=e.target.value
//   console.log(e.target.value)
// }



clear(){
  this.movieForm.patchValue({
    newtitle:"",
    img:"",
    description:"",
    category2:"-1"
  })
}
log(value:any){
  console.log(value)
}
Toggle(){
  this.isLoginMode=!this.isLoginMode
}
onSubmit(form:NgForm){
  if(form.invalid)
   return;
  this.loading=true
   let authResponse:Observable<AuthResponse>
  const email=form.value.email;
  const password=form.value.Password;
  if(this.isLoginMode){
  authResponse= this.auth.Login(email,password)
  
  }
  else{
  authResponse= this.auth.signUp(email,password)
}
authResponse.pipe(delay(2000)).subscribe(response=>{
  console.log(response);
  this.loading=false

},err=>{
  this.error=err
  this.loading=false
})
form.reset()
    
}
ChangeName(name:any){
  console.log(name)
 this.name=name
}

}
