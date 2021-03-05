function build_dashboard(){
    $('#no_results_message').hide()
    $('.favorites_button').hide()
    $('#show_favorites').click(function(){
        applyFavorites()
        $('#favorite').show()
    })
    $.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000", function(res) {
            $.get("https://pokeapi.co/api/v2/type/", function(res) {
                types=res.results
                for (let i = 0; i < types.length-2; i++) {
                    $('#typefilters').append(
                        `<div class='filterblock'><div class='row filterrow'><span>`
                        +firstUpper(types[i].name)
                        +`: </span><input type="checkbox" name='is_`+types[i].name
                        +`_type' class= 'filter' id='is_`
                        +types[i].name+`_type' value=true></div></div>`
                        )
                }
                $('#typefilters').append(
                    `<div class='filterblock'><div class='row filterrow'><span>Favorites:</span>
                    <input type="checkbox" name='is_favorite_type' class= 'filter' id='favorite'
                    value=true></div></div>`
                    )
                $('#favorite').hide()
                $('.filter').click(function(){
                    search()
                    $('.favorites_button').hide()
                })
                }, "json");
            var pokes = res.results
            var dex_start
            var dex_end
            var region_name=$('#region_info')[0].value.split('-')[2]
            $('#'+region_name).attr('checked','True')
            dex_start=parseInt($('#region_info')[0].value.split('-')[0])
            dex_end=parseInt($('#region_info')[0].value.split('-')[1])
            for (let i =dex_start;i<dex_end;i++){
                $.get(pokes[i].url, function(res) {
                    $('#boxes').append(`<div class='box' id='box`+i+`'></div>`)
                    $('#box'+i).append(`<img class='sprite' id='sprite`+i+`' src=`+res.sprites.front_default+` alt=`+res.name+`>`)
                    addclasses(res,i)
                    $('#sprite'+i).click(function(){
                        $('.selected').removeClass('selected')
                        $(this).parent().addClass('selected')
                        $('#name').text(firstUpper(res.name))
                        $('#types').text(typeList(res))
                        statList(res)
                        for (var i of $('.api_id')){
                            i.value=res.id
                        }
                        $('.favorites_button').show()
                    })
                    }, "json");
            }
        }, 'json');
    
}

function applyFavorites(){
    var favorites_ids=$('#favorites')[0].value.split('_')
    for (let i = 1; i < favorites_ids.length; i++) {
        $.get("https://pokeapi.co/api/v2/pokemon/"+favorites_ids[i], function(res) {
            $('#favorites_list').append(`<p>`+firstUpper(res.name)+`</p>`)
            $('.'+res.name).addClass('favorite')
        },'json')
        
    }
    $('#show_favorites').hide()
}

function addclasses(res,i){
    x=$('#box'+i)
    x.addClass(res.name)
    for (let j = 0; j < res.types.length; j++) {
        x.addClass('is_'+res.types[j].type.name+'_type')
    }
}

function search(clear=false){
    if(clear){
        $('.box').show()
        return
    }
    statList(null,clear=true)
    var filters = $('.filter')
    var filterlist=''
    for (let i = 0; i < filters.length; i++) {
        if( filters[i].checked){
            filterlist+=('.'+filters[i].id)
        }
    }
    $('.box').show()
    $('#no_results_message').hide()
    if(filterlist!=''){
        $('.box').not(filterlist).hide()
        if ($('.box').not(filterlist).length==$('.box').length){
            $('#no_results_message').show()
        }
    }
}

function firstUpper(str){
    return str[0].toUpperCase()+str.slice(1,str.length+1).toLowerCase()
}
function firstUpperAll(str){
    words=str.split('-')
    for (let i = 0; i < words.length; i++) {
        words[i]=firstUpper(words[i])   
    }
    return words.join('_')
}

function typeList(res){
    s=firstUpper(res.types[0].type.name)
    for (let i = 1; i < res.types.length; i++) {
        s+= ', '+firstUpper(res.types[i].type.name)
    }
    return s
}
function statList(res,clear=false){
    if(clear){
        $('#name').text('')
        $('#types').text('')
        x=$('li span')
        x.text('')
        x.parent().css('background-color','')
        x.parent().css('width','')
        $('.selected').removeClass('selected')
        return
    }
    for (let i = 0; i < res.stats.length; i++) {
        var statname=$('#'+res.stats[i].stat.name)
        var statvalue=res.stats[i].base_stat
        statname.text(statvalue)
        statname.parent().css('background-color',matchingColor(statvalue))
        statname.parent().css('width',(50+statvalue)+'px')
    }
}

function matchingColor(stat){
    var r=Math.min(255,500-3*stat)
    var g=Math.min(255,4*stat)
    return 'rgb('+r+','+g+','+0+')'
}

// // POPULATE FUNCTIONS


// function build_dashboard2(){
//     $('#search').click(function(){
//         search()
//     })
//     for (let i = 0; i < $('.type_name').length-2; i++) {
//         $('#typefilters').append(`<div><div class='row'><div>`+firstUpper($('.type_name')[i].value)+`: </div><input type="checkbox" class= 'filter' id='is_`+$('.type_name')[i].value+`_type'></div></div>`)
//     }
//     for (let i =0;i<$('.pokemon_name').length;i++){
//         $('#boxes').append(`<div class='box' id='box`+i+`'></div>`)
//         $('#box'+i).append(`<img class='sprite' id='sprite`+i+`' src=`+$('.pokemon_sprite')[i].value+` alt=`+$('.pokemon_name')[i].value+`>`)
        
        
//         x=$('#box'+i)
//         x.addClass($('.pokemon_name')[i].value)
//         poke_id=$('.pokemon_name')[i].id.split('_')
//         poke_id=poke_id[poke_id.length-1]
//         for (let j = 0; j < $('.pokemon_types_'+poke_id).length; j++) {
//             x.addClass('is_'+$('.pokemon_types_'+poke_id)[j].value+'_type')
//         }
        
//         $('#sprite'+i).click(function(){
//             $('.selected').removeClass('selected')
//             $(this).parent().addClass('selected')
//             $('#name').text(firstUpper($('.pokemon_name')[i].value))

//             s=firstUpper($('.type_name')[0].value)
//             for (let i = 1; i < $('.type_name').length; i++) {
//                 s+= ', '+firstUpper($('.type_name')[0].value)
//             }
            
//             $('#types').text(s)
            
//             statList2(poke_id)
            
//         })
//     }
// }


// function statList2(poke_id,clear=false){
//     if(clear){
//         $('#name').text('')
//         $('#types').text('')
//         x=$('li span')
//         x.text('')
//         x.parent().css('background-color','')
//         x.parent().css('width','')
//         $('.selected').removeClass('selected')
//         return
//     }
//     var stats=['hp','attack','defense','special_attack','special_defense','speed']
//     for (let i = 0; i < 6; i++) {
//         var statname=$('#'+stats[i])
//         var statvalue=$('#pokemon_stat_'+stats[i]+'_'+poke_id).value
//         statname.text(statvalue)
//         statname.parent().css('background-color',matchingColor(statvalue))
//         statname.parent().css('width',(50+statvalue)+'px')
//     }
// }


// function build_populate(){
//     $.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000", function(res) {
//         $('#populate').append(`<div id='pokemon_data' >`+
//                 `<input type="number" name="number_of_pokemon" value=`+res.count+`>`+
//                 `</div>`)
//             for (let i = 0; i < res.count; i++) {
//                 getpokemondata(res,i)
//             }    
//     },'json')
//     $.get("https://pokeapi.co/api/v2/move?offset=0&limit=10000", function(res) {
//         $('#populate').append(`<div id='move_data' >`+
//                 `<input type="number" name="number_of_moves" value=`+res.count+`>`+
//                 `</div>`)
//             for (let i = 0; i < res.count; i++) {
//                 getmovedata(res,i)
//             }    
//     },'json')
//     $.get("https://pokeapi.co/api/v2/type", function(res) {
//         $('#populate').append(`<div id='type_data' >`+
//                 `<input type="number" name="number_of_types" value=`+res.count+`>`+
//                 `</div>`)
//             for (let i = 0; i < res.count; i++) {
//                 gettypedata(res,i)
//             }    
//     },'json')
//     $.get("https://pokeapi.co/api/v2/ability?offset=0&limit=1000", function(res) {
//         $('#populate').append(`<div id='ability_data' >`+
//                 `<input type="number" name="number_of_abilities" value=`+res.count+`>`+
//                 `</div>`)
//             for (let i = 0; i < res.count; i++) {
//                 getabilitydata(res,i)
//             }    
//     },'json')
//     $.get("https://pokeapi.co/api/v2/version?offset=0&limit=1000", function(res) {
//         $('#populate').append(`<div id='version_data' >`+
//                 `<input type="number" name="number_of_versions" value=`+res.count+`>`+
//                 `</div>`)
//             for (let i = 0; i < res.count; i++) {
//                 getversiondata(res,i)
//             }    
//     },'json')
// }

// function getpokemondata(res,i){
//     $.get(res.results[i].url,function(res){
//         $('#pokemon_data').append(`<div id='data_for_pokemon_`+i+`' ></div>`)
//         $('#data_for_pokemon_'+i).append(`<div id='pokemon_name_`+i+`' >`+
//         `<input type="hidden" name="pokemon_name_`+i+`" value=`+res.name+`>`+
//         `</div>`)
//         $('#data_for_pokemon_'+i).append(`<div id='list_of_abilities_`+i+`'>`+
//         `<input type="hidden" name="number_of_abilities_`+i+`" value=`+res.abilities.length+`>`+
//         `</div>`)
//         for (let j = 0; j < res.abilities.length; j++) {
//             $('#list_of_abilities_'+i).append(`<input type="hidden" name="name_of_ability_`+i+`_`+j+`" value=`+res.abilities[j].ability.name+`>`)
//         }
//         $('#data_for_pokemon_'+i).append(`<div id='list_of_games_`+i+`'>`+
//         `<input type="hidden" name="number_of_games_`+i+`" value=`+res.game_indices.length+`>`+
//         `</div>`)
//         for (let j = 0; j < res.game_indices.length; j++) {
//             $('#list_of_games_'+i).append(`<input type="hidden" name="name_of_game_`+i+`_`+j+`" value=`+res.game_indices[j].version.name+`>`)
//         }
//         $('#data_for_pokemon_'+i).append(`<div id='list_of_moves_`+i+`'>`+
//         `<input type="hidden" name="number_of_moves_`+i+`" value=`+res.moves.length+`>`+
//         `</div>`)
//         for (let j = 0; j < res.moves.length; j++) {
//             $('#list_of_moves_'+i).append(`<input type="hidden" name="name_of_move_`+i+`_`+j+`" value=`+res.moves[j].move.name+`>`)
//         }
//         $('#data_for_pokemon_'+i).append(`<div id='list_of_stats_`+i+`'>`+
//         `</div>`)
//         for (let j = 0; j < res.stats.length; j++) {
//             $('#list_of_stats_'+i).append(`<input type="hidden" name="value_of_stat_`+i+`_`+j+`" value=`+res.stats[j].base_stat+`>`)
//         }
//         $('#data_for_pokemon_'+i).append(`<div id='sprite_url_`+i+`' >`+
//         `<input type="hidden" name="sprite_url_`+i+`" value=`+res.sprites.front_default+`>`+
//         `</div>`)
//         $('#data_for_pokemon_'+i).append(`<div id='list_of_types_`+i+`'>`+
//         `<input type="hidden" name="number_of_types_`+i+`" value=`+res.types.length+`>`+
//         `</div>`)
//         for (let j = 0; j < res.types.length; j++) {
//             $('#list_of_types_'+i).append(`<input type="hidden" name="name_of_type_`+i+`_`+j+`" value=`+res.types[j].type.name+`>`)
//         }

//     },'json')
// }


// function getmovedata(res,i){
//     $.get(res.results[i].url,function(res){
//         $('#move_data').append(`<div id='data_for_move_`+i+`' ></div>`)
//         $('#data_for_move_'+i).append(`<div id='move_name_`+i+`' >`+
//         `<input type="hidden" name="move_name_`+i+`" value=`+res.name+`>`+
//         `</div>`)
//     },'json')
// }

// function gettypedata(res,i){
//     $.get(res.results[i].url,function(res){
//         $('#type_data').append(`<div id='data_for_type_`+i+`' ></div>`)
//         $('#data_for_type_'+i).append(`<div id='type_name_`+i+`' >`+
//         `<input type="hidden" name="type_name_`+i+`" value=`+res.name+`>`+
//         `</div>`)
//     },'json')
// }

// function getabilitydata(res,i){
//     $.get(res.results[i].url,function(res){
//         $('#ability_data').append(`<div id='data_for_ability_`+i+`' ></div>`)
//         $('#data_for_ability_'+i).append(`<div id='ability_name_`+i+`' >`+
//         `<input type="hidden" name="ability_name_`+i+`" value=`+res.name+`>`+
//         `</div>`)
//     },'json')
// }

// function getversiondata(res,i){
//     $.get(res.results[i].url,function(res){
//         $('#version_data').append(`<div id='data_for_version_`+i+`' ></div>`)
//         $('#data_for_version_'+i).append(`<div id='version_name_`+i+`' >`+
//         `<input type="hidden" name="version_name_`+i+`" value=`+res.name+`>`+
//         `</div>`)
//     },'json')
// }