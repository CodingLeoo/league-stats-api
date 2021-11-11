import {
  ChampionMastery,
  MasteryService,
  Region,
  Summoner,
  SummonerService,
} from '@codingleoo/lol-nest';
import { Controller, Get, Inject } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from './util/providers';

@Controller()
export class AppController {
  constructor(
    private summonerService: SummonerService,
    private masteryService: MasteryService,
    @Inject(DATABASE_CONNECTION) private connection: Connection,
  ) {}

  @Get()
  getHello(): Promise<ChampionMastery[]> {
    return this.summonerService
      .getSummonerByName(Region.LAN, 'Ste nene')
      .then((summoner: Summoner) => {
        return this.masteryService.getChampionMasteriesByEncryptedSummonerId(
          Region.LAN,
          summoner.id,
        );
      });
  }
}
