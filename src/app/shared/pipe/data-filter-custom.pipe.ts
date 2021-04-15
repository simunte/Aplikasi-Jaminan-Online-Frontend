import * as _ from "lodash";
import * as moment from "moment";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dataFilterCustom"
})

export class DataFilterCustomPipe implements PipeTransform {

  transform(array: any[], query: any): any {
    if (Object.keys(query).length > 0) {
      return _.filter(array, row => {
        let found = 0;
        Object.keys(query).forEach(k => {
          let item = row[k];
          if (k.indexOf('date_') !== -1 || k.indexOf('tanggal_') !== -1) {
            item = moment(item).format('DD MMMM YYYY');
          }

          if (item.toString().toLowerCase().indexOf(query[k].toLowerCase()) !== -1) {
            found++;
          }
        });
        return found === Object.keys(query).length;
      });
    }
    return array;
  }
}
