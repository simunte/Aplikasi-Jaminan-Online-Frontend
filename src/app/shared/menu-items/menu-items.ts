import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/services/base_services/configuration';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
  alias_menu: string;
  isVisible?: boolean;
}
export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  alias_menu: string;
  isVisible?: boolean;
}
export interface Menu {
  label: string;
  main: MainMenuItems[];
  isVisible?: boolean;
}

@Injectable()
export class MenuItems {
  MENUITEMS: Menu[] = [{
    label: 'AJO Menu',
    main: [
      {
        state: 'dashboard',
        short_label: 'H',
        name: 'MENU.HOME',
        type: 'link',
        icon: 'feather icon-menu',
        children: [],
        alias_menu: Configuration.home,
        isVisible: false
      },
      {
        state: 'registration',
        short_label: 'G',
        name: 'MENU.BANK_GUARANTEE',
        type: 'link',
        icon: 'feather icon-credit-card',
        children: [],
        alias_menu: Configuration.bank_guarantee,
        isVisible: false
      },
      {
        state: 'report',
        short_label: 'R',
        name: 'MENU.REPORT',
        type: 'sub',
        icon: 'feather icon-file-text',
        children: [{
          state: 'recapitulation',
          name: 'MENU.RECAPITULATION',
          type: 'link',
          alias_menu: Configuration.rekapitulasi,
          children: [],
          isVisible: false
        },
        {
          state: 'verification',
          name: 'MENU.VERIFICATION',
          type: 'link',
          alias_menu: Configuration.verifikasi,
          children: [],
          isVisible: false
        },
        {
          state: 'settlement',
          name: 'MENU.SETTLEMENT',
          type: 'link',
          alias_menu: Configuration.settlement,
          children: [],
          isVisible: false
        }],
        alias_menu: '',
        isVisible: false
      },
      {
        state: 'transfer',
        short_label: 'T',
        name: 'MENU.MANUAL_DATA_TRANSFER',
        type: 'link',
        icon: 'feather icon-upload',
        children: [],
        alias_menu: Configuration.manual_data_transfer,
        isVisible: false
      },
      {
        state: 'master',
        short_label: 'M',
        name: 'MENU.MASTER_DATA',
        type: 'sub',
        icon: 'feather icon-settings',
        children: [{
          state: 'transactional',
          type: 'sub',
          name: 'MENU.TRANSACTIONAL',
          isVisible: false,
          alias_menu: Configuration.transaction,
          children: [
            {
              state: 'jenis-produk',
              type: 'link',
              name: 'MENU.JENIS_PRODUK',
              alias_menu: Configuration.trans_product,
              children: [],
              isVisible: false
            }, {
              state: 'jenis-jaminan',
              type: 'link',
              name: 'MENU.JENIS_JAMINAN',
              alias_menu: Configuration.trans_guarantee,
              children: [],
              isVisible: false
            }, {
              state: 'unit-pengguna',
              type: 'link',
              name: 'MENU.UNIT_PENGGUNA',
              alias_menu: Configuration.trans_unit_pengguna,
              children: [],
              isVisible: false
            }, {
              state: 'alamat-bank-penerbit',
              type: 'link',
              name: 'MENU.ALAMAT_BANK_PENERBIT',
              alias_menu: Configuration.trans_alamat_bank_penerbit,
              children: [],
              isVisible: false
            }, {
              state: 'currency',
              type: 'link',
              name: 'MENU.CURRENCY',
              alias_menu: Configuration.trans_currency,
              children: [],
              isVisible: false
            }]
        },
        {
          state: 'configuration',
          type: 'sub',
          name: 'MENU.CONFIGURATION',
          isVisible: false,
          alias_menu: Configuration.configuration,
          children: [
            {
              state: 'master-configuration',
              type: 'link',
              name: 'MENU.MASTER_CONFIGURATION',
              alias_menu: Configuration.conf_configuration,
              children: [],
              isVisible: false
            }, {
              state: 'beneficiary',
              type: 'link',
              name: 'MENU.NAMA_BENEFICIARY',
              alias_menu: Configuration.conf_beneficiary,
              children: [],
              isVisible: false
            }]
        }],
        alias_menu: '',
        isVisible: false
      },
      {
        state: 'user',
        short_label: 'U',
        name: 'MENU.USER_ACCESS_MANAGEMENT',
        type: 'sub',
        icon: 'feather icon-users',
        children: [{
          state: 'user-access',
          type: 'link',
          name: 'MENU.USER_ACCESS',
          alias_menu: Configuration.user_access,
          children: [],
          isVisible: false
        },
        {
          state: 'user-group',
          type: 'link',
          name: 'MENU.USER_GROUP',
          alias_menu: Configuration.user_groups,
          children: [],
          isVisible: false
        }],
        alias_menu: '',
        isVisible: false
      },
      {
        state: 'audit-trail',
        short_label: 'T',
        name: 'MENU.AUDIT_TRAIL',
        type: 'link',
        icon: 'feather icon-file-text',
        children: [],
        alias_menu: Configuration.audit_trail,
        isVisible: false
      }],
    isVisible: true
  }];


  getAll(GenerateMenu, selectedRole): Menu[] {
    const genMenu = JSON.parse(JSON.stringify(this.MENUITEMS));
    this.generateMenu(genMenu[0].main, GenerateMenu);
    return genMenu;
  }

  generateMenu(mainMenu: any[], roleMenu: any) {
    mainMenu.forEach(mMenu => {
      roleMenu.forEach(rMenu => {
        if (mMenu.children.length > 0) {
          this.generateSubMenu(mMenu.children, rMenu);
          let hasChild = mMenu.children.filter(x => x.isVisible == true).length;
          mMenu.isVisible = hasChild > 0 ? true : mMenu.isVisible;
        } else {
          if (rMenu.alias_menu === mMenu.alias_menu) {
            mMenu.isVisible = true;
          }
        }
      });
    });
  }

  generateSubMenu(menu: any[], roleMenu: any) {
    // let hasChild = 0;
    menu.forEach(mMenu => {
      if (mMenu.children.length > 0) {
        this.generateSubMenu(mMenu.children, roleMenu);
        let hasChild = mMenu.children.filter(x => x.isVisible == true).length;
        mMenu.isVisible = hasChild > 0 ? true : mMenu.isVisible;
      } else {
        if (roleMenu.alias_menu === mMenu.alias_menu) {
          mMenu.isVisible = true;
        }
      }
    });
  }
}
