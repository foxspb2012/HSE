import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @Expose()
  public login: string;

  @Expose()
  public email: string;
}
