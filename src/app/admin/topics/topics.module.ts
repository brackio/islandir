import { NgModule } from '@angular/core';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '../../common/common.module';
import { UploaderModule } from '../../uploader/uploader.module';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicEditComponent } from './topic-edit/topic-edit.component';
import { TopicListComponent } from './topic-list/topic-list.component';

import { TopicService } from '../../models/topics/topic.service';
import { TopicResolverService } from './shared/topic-resolver.service';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CONFIG } from '../../core/config';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    UploaderModule,
    CloudinaryModule.forRoot(cloudinaryLib,
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
    TopicService,
    TopicResolverService
  ]
})
export class TopicsModule { }
