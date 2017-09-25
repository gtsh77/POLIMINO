import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent }    from './main.component';
import { MainBaseComponent }    from './main.base.component';

const mainRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [ 
	    {
	        path: '',
	        component: MainBaseComponent
	    }
    ]
  }
];

export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);