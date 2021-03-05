from django.shortcuts import render ,redirect
from django.contrib import messages
from .models import User
import bcrypt


def root(request):
    return render(request,'logreg.html')

def register(request):
    errors = User.objects.r_validator(request.POST)
    if len(errors)>0:
        for key,value in errors.items():
            messages.error(request,value)
        return redirect('/')
    else:
        x=User.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
            password= bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
        )
        request.session['user_id']=x.id
        return redirect('/load_dashboard')

def load_dashboard(request):
    if 'region_info' not in request.session or 'region' not in request.POST:
        request.session['region_info']='0-151-kanto'
    else:
        request.session['region_info']=request.POST['region']
    return redirect('/dashboard')

def dashboard(request):
    user=User.objects.get(id=request.session['user_id'])
    context={
        'region_info':request.session['region_info'],
        'users':User.objects.all(),
        'user':user,
    }
    return render(request,'dashboard.html',context)

def add_favorite(request):
    u=User.objects.get(id=request.session['user_id'])
    s=u.favorites.split('_')
    id=request.POST['api_id']
    if id not in s:
        s.append(id)
    s='_'.join(s)
    u.favorites=s
    u.save()
    return redirect('/dashboard')

def remove_favorite(request):
    u=User.objects.get(id=request.session['user_id'])
    s=u.favorites.split('_')
    id=request.POST['api_id']
    if id in s:
        s.remove(id)
    s='_'.join(s)
    u.favorites=s
    u.save()
    return redirect('/dashboard')

def login(request):
    errors = User.objects.l_validator(request.POST)
    if len(errors)>0:
        for key,value in errors.items():
            messages.error(request,value)
        return redirect('/')
    else:
        request.session['user_id']=User.objects.get(email=request.POST['email']).id
        return redirect('/load_dashboard')

def logout(request):
    request.session.clear()
    return redirect('/')


#STUFF FOR POPULATE PAGE

# def populate(request):
#     context={
#         'pokemon':Pokemon.objects.all(),
#         'types':Type.objects.all(),
#         'abilities':Ability.objects.all(),
#         'moves':Move.objects.all(),
#         'games':Game.objects.all(),

#     }
#     return render(request,'populate.html',context)

# def filldb(request):
#     abilitycount=int(request.POST['number_of_abilities'])
#     for i in range(abilitycount):
#         try:
#             name=name=request.POST[f'ability_name_{i}']
#         except: continue
#         Ability.objects.create(
#             name=name
#         )

#     versioncount=int(request.POST['number_of_versions'])
#     for i in range(versioncount):
#         try: name=name=request.POST[f'version_name_{i}']
#         except: continue
#         Game.objects.create(
#             name=name
#         )

#     typecount=int(request.POST['number_of_types'])
#     for i in range(typecount):
#         try: name=name=request.POST[f'type_name_{i}']
#         except: continue
#         Type.objects.create(
#             name=name
#         )

#     movecount=int(request.POST['number_of_moves'])
#     for i in range(movecount):
#         try: name=request.POST[f'move_name_{i}']
#         except: continue
#         Move.objects.create(
#             name=name
#         )
#     pokemon_count=int(request.POST['number_of_pokemon'])
#     for i in range(pokemon_count):
#         try: name=request.POST[f'pokemon_name_{i}']
#         except: continue
#         sprite_url=request.POST[f'sprite_url_{i}']
#         hp=request.POST[f'value_of_stat_{i}_{0}']
#         attack=request.POST[f'value_of_stat_{i}_{1}']
#         defense=request.POST[f'value_of_stat_{i}_{2}']
#         special_attack=request.POST[f'value_of_stat_{i}_{3}']
#         special_defense=request.POST[f'value_of_stat_{i}_{4}']
#         speed=request.POST[f'value_of_stat_{i}_{5}']
#         x=Pokemon.objects.create(
#             name=name,
#             sprite_url=sprite_url,
#             hp=int(hp),
#             attack=int(attack),
#             defense=int(defense),
#             special_attack=int(special_attack),
#             special_defense=int(special_defense),
#             speed=int(speed)
#         )
#         for j in range(int(request.POST[f'number_of_abilities_{i}'])):
#             try: x.abilities.add(Ability.objects.get(name=request.POST[f'name_of_ability_{i}_{j}']))
#             except: 
#                 print(f"could not add ability {i} {j}, {request.POST[f'name_of_ability_{i}_{j}']}")
#                 continue
#         for j in range(int(request.POST[f'number_of_games_{i}'])):
#             try: x.games.add(Game.objects.get(name=request.POST[f'name_of_game_{i}_{j}']))
#             except: 
#                 print(f"could not add game {i} {j}, {request.POST[f'name_of_game_{i}_{j}']}")
#                 continue
#         for j in range(int(request.POST[f'number_of_moves_{i}'])):
#             try: x.moves.add(Move.objects.get(name=request.POST[f'name_of_move_{i}_{j}']))
#             except: 
#                 print(f"could not add move {i} {j}, {request.POST[f'name_of_move_{i}_{j}']}")
#                 continue
#         for j in range(int(request.POST[f'number_of_types_{i}'])):
#             try: x.types.add(Type.objects.get(name=request.POST[f'name_of_type_{i}_{j}']))
#             except: 
#                 print(f"could not add type {i} {j}, {request.POST[f'name_of_type_{i}_{j}']}")
#                 continue

#     return redirect('/dashboard')

# def cleardb(request):
#     for x in Pokemon.objects.all():
#         x.delete()
#     for x in Ability.objects.all():
#         x.delete()
#     for x in Game.objects.all():
#         x.delete()
#     for x in Type.objects.all():
#         x.delete()
#     for x in Move.objects.all():
#         x.delete()
#     print('EVERYTHING DELETED')
#     return redirect('/dashboard')
# # Create your views here.
