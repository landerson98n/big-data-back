import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const prisma = new PrismaClient().$extends(
      withPulse({
        apiKey: process.env['PULSE_API_KEY'] as string
      })
    )
  }
}
