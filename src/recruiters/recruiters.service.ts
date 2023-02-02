import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Recruiter } from './schema/recruiter.schema'

@Injectable()
export class RecruitersService {
    constructor(
        @InjectModel(Recruiter.name)
        private recruiterModel: mongoose.Model<Recruiter>
    ) {}

    async findAll(query: Query): Promise<Recruiter[]> {
        const resultPerPage = Number(query.dispOnPage) || 5
        const currentPage = Number(query.page) || 1
        const skip = resultPerPage * (currentPage - 1)
        const keyword = query.keyword? {
            name: {
                $reqex: query.keyword,
                $options: 'i' //sensitive
            }
        }: {}
        const recruiters = await this.recruiterModel.find({...keyword}).limit(resultPerPage).skip(skip)
        return recruiters
    }

    async createRecord(recruiter: Recruiter): Promise<Recruiter> {
        const recruiters = await this.recruiterModel.create({
            ...recruiter,
            createDate: new Date(),
            modifiedDate: new Date()
        })
        return recruiters
    }

    async getById(id: string): Promise<Recruiter> {
        const recruiter = await this.recruiterModel.findById(id)
        if (!recruiter) {
            throw new NotFoundException('Not found')
        }
        return recruiter
    }

    async updateById(id: string, data: Recruiter): Promise<Recruiter> {
        return await this.recruiterModel.findByIdAndUpdate(id, { ...data, modifiedDate: new Date() })
    }

    async deleteById(id: string): Promise<Recruiter> {
        return await this.recruiterModel.findByIdAndDelete(id)
    }
}
