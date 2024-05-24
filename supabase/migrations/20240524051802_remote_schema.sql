create policy "Give anon users access to JPG images in folder wqvoe3_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'cover_img'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


create policy "Give users access for moderator wqvoe3_0"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'cover_img'::text) AND (( SELECT is_in_role('moderator'::text) AS is_in_role) = 1)));


create policy "Give users access for moderator wqvoe3_1"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'cover_img'::text) AND (( SELECT is_in_role('moderator'::text) AS is_in_role) = 1)));


create policy "Give users access for moderator wqvoe3_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'cover_img'::text) AND (( SELECT is_in_role('moderator'::text) AS is_in_role) = 1)));



