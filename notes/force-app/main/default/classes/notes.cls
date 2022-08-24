public without sharing class notes {
    
    //public static string nname = AccountContactsNotes.thename;
    
    
    @AuraEnabled
    public static List<Object> accountNotesn(string nname){
         
                 //AccountContactsNotes.myname();
                 String name = '%' + nname + '%';
        
                      
                 
                 List<Account> acc= [SELECT Id, Name, OwnerId, Owner.Name FROM Account WHERE Name LIKE : name];
                 List<Contact> con= [SELECT Id, Name, AccountId FROM Contact where AccountId IN: acc];
                
                 List<Note> notes= [SELECT Body, Title, Parent.Type, Parent.Name  FROM Note WHERE (ParentId IN: con OR ParentId IN: acc) LIMIT 10];
                 List<Object> nac = new List<Object>();
                 
             
                 for(Note n: notes){
                     Map<string,string> myNotes = new map<string,string>();
                     myNotes.put('Name',n.Parent.Name);
                     myNotes.put('Type',n.Parent.Type);
                     myNotes.put('Title',n.Title);
                     myNotes.put('Body',n.Body);
                     
                     
                     nac.add(myNotes);
                 }
                 //system.debug(myNotes);
                 system.debug(notes);
                 system.debug(nac);
                 return nac;
    }
    


}