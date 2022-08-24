import { LightningElement } from 'lwc';






export default class ChilsPaginator extends LightningElement {

    handlePrevious(event){
        this.dispatchEvent(new CustomEvent('previous'));
    }
    handleNext(event){
        this.dispatchEvent(new CustomEvent('next'));
        console.log(myvalue);
    }
    
    




}