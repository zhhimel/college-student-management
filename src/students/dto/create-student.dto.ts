import {
  IsString,
  IsInt,
  Min,
  IsDateString,
  IsIn,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsString()
  course: string;
  @IsString()
  hobby: string;

  @IsDateString()
  admissionDate: string;
}
