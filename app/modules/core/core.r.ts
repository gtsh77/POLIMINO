import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent }    from './core.c';
import { MainComponent }    from './main.c';

const CoreRoutes: Routes = [
  {
    path: 'main',
    component: CoreComponent,
    children: [ 
	    {
	        path: '',
	        component: MainComponent
	    }
    ]
  }
];

export const CoreRouting: ModuleWithProviders = RouterModule.forChild(CoreRoutes);