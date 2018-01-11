import { NgModule } from '@angular/core';
import { CovalentDialogsModule } from '@covalent/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicEditComponent } from './topic-edit/topic-edit.component';
import { TopicListComponent } from './topic-list/topic-list.component';

import { TopicService } from '../../models/topics/topic.service';
import { TopicResolverService } from './shared/topic-resolver.service';
import { UploadService } from '../../core/upload.service';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { CONFIG } from '../../core/config';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CloudinaryModule.forRoot(Cloudinary,
      {
          cloud_name: CONFIG.cloudinary.cloud_name,
          upload_preset: CONFIG.cloudinary.upload_preset
        }
      ),
    CovalentDialogsModule,
    TopicsRoutingModule
  ],
  declarations: [
    TopicEditComponent,
    TopicListComponent
  ],
  providers: [
    UploadService,
    TopicService,
    TopicResolverService
  ]
})
export class TopicsModule { }
