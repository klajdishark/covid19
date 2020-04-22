import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children:
            [
                {
                    path: 'your-locations',
                    children: [
                        {path: '', loadChildren: './your-locations/your-locations.module#YourLocationsPageModule'},
                    ]
                },
                {
                    path: 'map',
                    children: [
                        {
                            path: '',
                            loadChildren: './map/map.module#MapPageModule'
                        }
                    ]
                },
                {
                    path: 'export-your-locations',
                    children: [
                        {
                            path: '',
                            loadChildren: './export-your-locations/export-your-locations.module#ExportYourLocationsPageModule'
                        }
                    ]
                },
                {
                    path: 'about-us', children: [
                        {
                            path: '',
                            loadChildren: './about-us/about-us.module#AboutUsPageModule'
                        }
                    ]
                },

                {
                    path: '',
                    redirectTo: '/tabs/your-locations',
                    pathMatch: 'full'
                }
            ]
    }
];

@NgModule({
    imports:
        [RouterModule.forChild(routes)],
    exports:
        [RouterModule]
})
export class TabsPageRoutingModule {
}
