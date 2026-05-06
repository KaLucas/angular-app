import { afterNextRender, Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../../shared/models/user.model';

const MOCK_DATA: User[] = [
  {
    id: 'e5f76971-949c-4141-93aa-6fce7aad44d2',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-28T19:22:19.457Z',
    updated_at: '2026-04-28T19:22:19.457Z',
    deleted_at: null,
    data: {
      email: 'email@email.com',
      last_name: 'User',
      first_name: 'New',
    },
  },
  {
    id: 'a32fb6c4-8981-4b6a-ac5e-b5a49f667252',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-28T19:20:18.121Z',
    updated_at: '2026-04-28T19:20:18.121Z',
    deleted_at: null,
    data: {
      email: 'email@email.com',
      last_name: 'User',
      first_name: 'Novo',
    },
  },
  {
    id: 'b3bab7ef-b1bc-44a6-99c7-f3e1429ded4f',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-24T19:36:51.619Z',
    updated_at: '2026-04-28T19:09:56.781Z',
    deleted_at: null,
    data: {
      email: 'novo@email.com',
      last_name: 'Usuário 2',
      first_name: 'Novo',
    },
  },
  {
    id: '7cf5fded-8c59-4c7b-a15a-43e80c5bc4c8',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-17T18:42:45.720Z',
    updated_at: '2026-04-24T19:24:10.226Z',
    deleted_at: null,
    data: {
      email: 'teste@teste.com.br',
      last_name: 'Usuário 3',
      first_name: 'Outro',
    },
  },
  {
    id: '830b115f-56a9-48c6-a0f1-f7aa9e6fbb4e',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-15T22:38:04.713Z',
    updated_at: '2026-04-17T18:38:05.102Z',
    deleted_at: null,
    data: {
      email: 'lara@email.com',
      last_name: 'Neném',
      first_name: 'Lara',
    },
  },
  {
    id: 'be8087a8-50a1-415b-bc98-eda6ed4f6fba',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-04-14T19:50:09.646Z',
    updated_at: '2026-04-14T19:50:09.646Z',
    deleted_at: null,
    data: {
      email: 'tara.maclay@sunnydale.com',
      last_name: 'Maclay',
      first_name: 'Tara',
    },
  },
  {
    id: '0c703e8d-d990-432d-acdf-c7241648b01e',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:38:17.805Z',
    updated_at: '2026-03-30T18:38:17.805Z',
    deleted_at: null,
    data: {
      email: 'cordelia.chase@sunnydale.com',
      last_name: 'Chase',
      first_name: 'Cordelia',
    },
  },
  {
    id: 'c2dc0768-d3ef-48fe-96c4-5cd36ad7b202',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:38:10.661Z',
    updated_at: '2026-03-30T18:38:10.661Z',
    deleted_at: null,
    data: {
      email: 'angel@losangeles.com',
      last_name: 'Angelus',
      first_name: 'Angel',
    },
  },
  {
    id: 'c377af81-459f-4a50-83f4-fa3d23710079',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:38:03.797Z',
    updated_at: '2026-03-30T18:38:03.797Z',
    deleted_at: null,
    data: {
      email: 'rupert.giles@sunnydale.com',
      last_name: 'Giles',
      first_name: 'Rupert',
    },
  },
  {
    id: 'ebc72e60-2653-4bc2-8249-6f7c6178051a',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:37:57.914Z',
    updated_at: '2026-03-30T18:50:01.631Z',
    deleted_at: null,
    data: {
      email: 'xander.harris@sunnydale.com',
      last_name: 'Harris',
      first_name: 'Xander',
    },
  },
  {
    id: '7c79f554-e187-4fa8-997b-9eb70677064e',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:37:42.203Z',
    updated_at: '2026-03-30T18:37:42.203Z',
    deleted_at: null,
    data: {
      email: 'willow.rosenberg@sunnydale.com',
      last_name: 'Rosenberg',
      first_name: 'Willow',
    },
  },
  {
    id: '23a4fb42-20a1-4015-bdcb-c45b17106bc6',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T18:37:06.161Z',
    updated_at: '2026-03-30T18:49:34.376Z',
    deleted_at: null,
    data: {
      email: 'buffy.summers@sunnydale.com',
      last_name: 'Summers',
      first_name: 'Buffy',
    },
  },
  {
    id: '9fb085fa-a3e3-451b-8404-1942a3d0d303',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-03-30T17:28:46.477Z',
    updated_at: '2026-04-14T14:36:55.283Z',
    deleted_at: null,
    data: {
      email: 'dawn.summers@sunnydale.com',
      last_name: 'Summers',
      first_name: 'Dawn',
    },
  },
];

@Component({
  selector: 'app-users-list',
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  protected readonly displayedColumns = [
    'first_name',
    'last_name',
    'email',
    'created_at',
    'updated_at',
    'actions',
  ];
  protected readonly dataSource = new MatTableDataSource<User>(MOCK_DATA);

  private readonly paginator = viewChild.required(MatPaginator);

  constructor() {
    afterNextRender(() => {
      this.dataSource.paginator = this.paginator();
    });
  }
}
