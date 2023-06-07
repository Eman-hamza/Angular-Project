import { AbstractControl, FormControl } from "@angular/forms";
export function forbiddinNameVal(controlname:RegExp)
{
return (control:AbstractControl)=>{
   const forbidden=controlname.test(control.value) ;

  return forbidden? {'forbiddenvalue':{value:control.value}} : null ; 
}
}