import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Recruiter {
    @Prop()
    recriterFullName: string

    @Prop()
    mail?: string

    @Prop()
    mobile?: string

    @Prop()
    linkedinId?: string

    @Prop()
    comment: string

    @Prop()
    company: string

    @Prop()
    createDate: string

    @Prop()
    modifiedDate: string
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter)