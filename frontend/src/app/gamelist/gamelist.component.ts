import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from '../service/price/price.service';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  @Input() games: Array<object>;
  @Input() processing: boolean;

  private gameName: string;
  private gameId: string;
  private gamePrice: string;
  private gameDiscount: string;
  private gameDiscountValue: string;
  private isLoadingPrice: boolean;

  private priceService: PriceService;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private price: PriceService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.priceService = price;
  }

  ngOnInit() {
  }

  open(content, gameName, gameId) {
    this.isLoadingPrice = true;
    this.gameName = gameName;
    this.gameId = gameId;
    this.getPrice(gameId);
    this.modalService.open(content);
  }

  getPrice(gameId) {
    this.priceService.getPrice(gameId).subscribe(result => {
      console.log(result);
      this.gamePrice = this.parsePrice(result);
      this.gameDiscount = this.parseDiscountPercent(result);
      this.gameDiscountValue = this.parseDiscountValue(result);
      this.isLoadingPrice = false;
    }, error => {
      this.gamePrice = '0';
      this.gameDiscount = 'No';
      this.gameDiscountValue = '0';
      this.isLoadingPrice = false;
    });
  }

  parsePrice(result) {
     if (result === undefined || result.length === 0) {
       return '0';
     }
     if (result.price_overview.final_formatted !== undefined) {
      const price = result.price_overview.final_formatted !== '' ? result.price_overview.final_formatted : '0';
      return price;
    } else {
      return '0';
    }
  }

  parseDiscountPercent(result) {
    if (result === undefined || result.length === 0) {
      return '0';
    }
    if (result.price_overview.discount_percent !== undefined) {
      const discountPercent = result.price_overview.discount_percent !== 0 ? 'Yes' : 'No';
      return discountPercent;
    } else {
      return '0';
    }
  }

  parseDiscountValue(result) {
    if (result === undefined || result.length === 0) {
      return '0';
    }
    if (result.price_overview.discount_percent !== undefined) {
      return result.price_overview.discount_percent;
    } else {
      return '0';
    }
  }
}
