import { LightningElement, api, track, wire } from 'lwc';

import getNotes from '@salesforce/apex/AccountContactsNotes.accountNotes';



const columns  = [
    {label: 'Name',fieldName:'Name' }, {label:'Object Type', fieldName:'Type'},{label: 'Title', fieldName: 'Title'}, {label: 'Body',fieldName:'Body' }
]




export default class NotesAC extends LightningElement {
    
    
    
    searchValue;
    
    columns = columns;
    displayResult;
    items;
    startingRecord=1;
    page=1;
    endingRecord=0;
    totalRecordCount;
    totalPage;
    pagesize=10;


    
    

    handlePDF(){
    	window.print();
	} 

    @wire(getNotes, {str:'$searchValue'})
    fetchNotes(result){

        if(result.data){  
            
            //console.log('Result is:', result);
            //this.displayResult = result;
            this.items=result.data
            //this.displayResult=this.items.slice(0,this.pagesize);
            this.totalRecordCount=result.data.length;
            this.totalPage=Math.ceil(this.totalRecordCount/this.pagesize);
            console.log(this.totalPage);
            this.displayResult=this.items.slice(0,this.pagesize);
            
            //this.myresults=result
            this.endingRecord=this.pagesize;

            
            
            
            

        
        }
        
    }

    handleSearch(event){
        this.searchValue = event.target.value;
        //this.valuepdf=this.searchValue;
        
        
        this.fetchNotes();
        
        
        //this.generatePdf();
    }

    prevHandle(event){
        if(this.page>1){
            this.page = this.page -1;
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandle(event){
        if(this.page < this.totalPage && this.page !== this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        }
    }

    

    displayRecordPerPage(page){
        this.startingRecord = (page-1)*this.pagesize;
        this.endingRecord = page*this.pagesize;
        this.endingRecord = (this.endingRecord > this.totalRecordCount)?this.totalRecordCount:this.endingRecord;
        this.displayResult=this.items.slice(this.startingRecord,this.endingRecord);
        this.startingRecord= this.startingRecord + 1;
    }


    

	

    
    
        




}