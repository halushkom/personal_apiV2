import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { CreateRecruiterDTO } from './dto/create_recruiter.dto';
import { UpdateRecruiterDTO } from './dto/update_recruiter.dto';
import { RecruitersService } from './recruiters.service';
import { Recruiter } from './schema/recruiter.schema';

@Controller('recruiters')
export class RecruitersController {
    constructor(private recruitersService: RecruitersService) {}

    @Get()
    async getAllRecruiters(
        @Query()
        query: ExpressQuery
    ): Promise<Recruiter[]> {
        return this.recruitersService.findAll(query)
    }

    @Post()
    async createRecordWithRecruiterInfo(
        @Body()
        recruiter: CreateRecruiterDTO
    ): Promise<Recruiter> {
        return this.recruitersService.createRecord(recruiter)
    }
    
    @Get(':id')
   async getRecruiterById (
    @Param('id')
    id:string
    ): Promise<Recruiter> {
        return this.recruitersService.getById(id)
   }

   @Put(':id')
   async updateRecordById(
    @Param('id')
    id: string,
    @Body()
    recruiter: UpdateRecruiterDTO
   ): Promise<Recruiter> {
        await this.recruitersService.getById(id)
        return this.recruitersService.updateById(id, recruiter)
   }

   @Delete(':id')
   async deleteRecordById(
    @Param('id')
    id: string
   ): Promise<{deleted: Boolean}> {
        await this.recruitersService.getById(id)
        const recruiter = await this.recruitersService.deleteById(id)
        if (recruiter) {
            return {
                deleted: true
            }
        }
   }
}
