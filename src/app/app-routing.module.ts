import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResolveGuard } from './guards/resolve.guard';
import { OptimizedListComponent } from './views/optimized-list.component';
import { ResultComponent } from './views/result.component';

const routes: Routes = [
  {path: 'optimized',
  component: OptimizedListComponent,
  resolve: {
    optList: ResolveGuard,
  }
},
{path: 'result',
component: ResultComponent,
resolve:{
  optList: ResolveGuard,
}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
